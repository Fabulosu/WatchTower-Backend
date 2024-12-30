import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { name: dto.name },
          { email: dto.email },
        ],
      },
    });

    if (user) throw new ConflictException("There is already an account with this username or email!");

    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await bcrypt.hashSync(dto.password, await bcrypt.genSaltSync(10)),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  };

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  };

  async findUser(username: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { name: username },
          { email: username },
        ],
      },
    });

    if (user) { return { exists: true } } else return { exists: false };
  };
}
