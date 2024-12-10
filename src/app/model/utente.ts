export class Utente {
	public id?: number;

	constructor(
		readonly email: string,
		readonly authToken: string,
		readonly nome: string,
		readonly cognome: string
	) { }
}
