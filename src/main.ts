// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '@/configs/swagger.config';

const PORT = process.env.PORT ?? 4000;

async function start() {
    const app = await NestFactory.create(AppModule);
    setupSwagger(app);
    await app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
        console.log(`http://localhost:${PORT}/api-docs`)
    });
}

void start();
