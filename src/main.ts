// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@/configs/swagger.config';
import { AdminsService } from './modules/admins/admins.service';
import { createInitialAdmin } from './common/utils/create-admin.util';

const PORT = process.env.PORT ?? 4000;

async function start() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);

    const adminService = app.get(AdminsService);
    await createInitialAdmin(adminService);

    await app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
        console.log(`http://localhost:${PORT}/api-docs`)
    });
}

void start();
