export class Utente {
	public id?: number;

	constructor(
		readonly email: string,
		readonly authToken: string,
		readonly nome: string,
		readonly cognome: string
	) { }

	static fromApiResponse(response: any): Utente {
		const utente = new Utente(
			response.email,
			response.token,
			response.firstname,
			response.lastname
		);
		utente.id = response.id;
		return utente;
	}
}
