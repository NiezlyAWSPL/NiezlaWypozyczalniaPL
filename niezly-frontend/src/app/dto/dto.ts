
export class CreateLibraryRequestDTO {
    name: string;
    address: string;
}

export class CreateBookRequestDTO {
    author: string;
    title: string;
    libraryId: string;
}

export class BookDefinitionFilterDTO {
    libraryId: string;
    titlePrefix: string;
    skip: number;
    take: number;
}

export class CreateBookDefinitionDTO {
    libraryId: string;
    title: string;
    author: string;
}

export class RentBookRequestDTO {
    pk: string;
    user: string;
}

export class ReturnBookRequestDTO {
    pk: string;
}

export class ReserveBookRequestDTO {
    bookDefinitionId: string;
}

export class BookDefinitionDTO {
    id: string;
    libraryId: string;
    title: string;
    author: string;
}

export class BookDTO {
    pk: string;
    bookDefinitionId: string;
    author: string;
    title: string;
    libraryId: string;
    userId: string;
    status: string;
    rentedDate: LocalDateTimeDTO;
    reservationBeginDate: LocalDateTimeDTO;
    reservationExpireDate: LocalDateTimeDTO;
}

export class LocalDateTimeDTO {
    dayOfMonth: number;
    hour: number;
    minute: number;
    monthValue: number;
    second: number;
    year: number;
}

export class LibraryDTO {
    name: string;
    address: string;
}

export class RentalDTO {
    pk: string;
    author: string;
    title: string;
    libraryId: string;
    userId: string;
    rentedDate: LocalDateTimeDTO;
    returnDate: LocalDateTimeDTO;
}

export class UserDTO {
    guid: string;
    login: string;
    authorities: string[];
}
