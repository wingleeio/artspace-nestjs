import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { WorksModule } from './works/works.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { ImagesModule } from './images/images.module';

@Module({
	imports: [
		UserModule,
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DATABASE_URL,
			// host: 'localhost',
			// port: 5432,
			// username: 'winglee',
			// password: '',
			// database: 'aaartspace',
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
			extra: {
				ssl: {
					rejectUnauthorized: false
				}
			}
		}),
		WorksModule,
		CategoriesModule,
		CommentsModule,
		ImagesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
