import { AdminsService } from '@/modules/admins/admins.service';
import * as readline from 'readline';
import * as bcrypt from 'bcrypt';
import { AdminRole } from '../enums/enums';

function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        }),
    );
}

export async function createInitialAdmin(adminService: AdminsService) {
    const existing = await adminService.findOneByRole('super-admin'); // sizning service'da bu metod bo'lishi kerak
    console.log(existing);
    
    if (existing) {
        console.log('[✔] Admin already exists');
        return;
    }

    console.log('[!] No admin found. Creating one...\n');

    const username = await askQuestion('Username: ');
    const password = await askQuestion('Password: ');
    const hashedPassword = await bcrypt.hash(password, 10);

    await adminService.addAdmin({ username, password: hashedPassword, role: AdminRole.superAdmin, name: 'Sector Technology' });

    console.log('\n[✔] Admin successfully created!');
}
