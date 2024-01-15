import { ApiProperty } from "@nestjs/swagger";
import { Ordinazione } from "../entities/ordinazioni.entity";

export class OrdinazioniResult {
	@ApiProperty()
	readonly result: boolean;
	@ApiProperty()
	readonly message: string;
	@ApiProperty()
	readonly ordinazione: Ordinazione[];
}
