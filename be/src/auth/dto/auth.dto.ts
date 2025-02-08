import { IsEmail, IsString, MinLength, Matches, ValidateIf, IsNotEmpty } from 'class-validator';

export class AuthDto {
    @IsEmail()
    email: string;
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password must contain at least 1 uppercase letter and 1 number',
    })
    password: string;
    // Only validate if the data contains the firstName field (Register)
    @ValidateIf((o) => o.firstName !== undefined)
    @IsString({ message: 'First name must be a string' })
    @MinLength(2, { message: 'First name must be at least 2 characters long' })
    firstName?: string;
    // Only validate if the data contains the lastName field (Register)
    @ValidateIf((o) => o.lastName !== undefined)
    @IsString({ message: 'Last name must be a string' })
    @MinLength(2, { message: 'Last name must be at least 2 characters long' })
    lastName?: string;
}