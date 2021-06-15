
export class CreateLibraryRequestDTO {
    name: string;
    address: string;
}

export class CreateBookRequestDTO {
    author: string;
    title: string;
    libraryId: string;
}

public class BookDefinitionFilterDTO {
    libraryId: string;
    titlePrefix: string;
    skip: number;
    take: number;
}

public class CreateBookDefinitionDTO {
    libraryId: string;
    title: string;
    author: string;
}

public class CreateLibraryRequestDTO {
    name: string;
    address: string;
}

public class RentBookRequestDTO {
    pk: string;
    user: string;
}

public class ReturnBookRequestDTO {
    pk: string;
}

public class ReserveBookRequestDTO {
    pk: string;
    user: string;
}

public class BookDefinitionDTO {
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

public class RentalDTO {
    pk: string;
    author: string;
    title: string;
    libraryId: string;
    userId: string;
    rentedDate: Date;
    returnDate: Date;
}
