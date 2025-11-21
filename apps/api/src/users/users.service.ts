import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, password, role, firstName, lastName, country, phoneNumber, businessName } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.usersRepository.create({
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
            country,
            phoneNumber,
            businessName,
        });

        return this.usersRepository.save(user);
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { email } });
        return user || undefined;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.usersRepository.findOne({ where: { id } });
        return user || undefined;
    }
}
