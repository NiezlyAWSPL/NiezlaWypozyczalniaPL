
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
    pk: string;
    user: string;
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
    rentedDate: string;
    reservationBeginDate: string;
    reservationExpireDate: string;
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
    rentedDate: Date;
    returnDate: Date;
}

export class UserDTO {
    guid: string;
    login: string;
}
