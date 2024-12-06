import type { Events } from "../entity/Event";
import type { EventAndGuests } from "../entity/EventAndGuests";
import type { IBaseRepository } from "./IBaseRepository";

export class EventAndGuestsRepository
	implements IBaseRepository<EventAndGuests>
{
	async create(event: EventAndGuests): Promise<EventAndGuests> {
		const response = await fetch(
			"http:/192.168.1.52:3333/eventAndGuests",
			{
				method: "POST",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(event),
			},
		);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const createdEvent: EventAndGuests = await response.json();
		return createdEvent;
	}
	async update(event: EventAndGuests, id: string): Promise<EventAndGuests> {
		const response = await fetch(
			`http:/192.168.1.52:3333/event/${id}`,
			{
				method: "PUT",
				headers: {
					"ngrok-skip-browser-warning": "true",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(event),
			},
		);
		if (!response.ok) {
			throw new Error(`Erro na Requisição,status: ${response.status}`);
		}
		const updateEvent: EventAndGuests = await response.json();
		return updateEvent;
	}
	async delete(id: string): Promise<EventAndGuests | true> {
		const response = await fetch(
			`http:/192.168.1.52:3333/event/${id}`,
			{
				method: "DELETE",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);
		return response.status === 204 ? true : await response.json();
	}

	async getAll(): Promise<EventAndGuests[]> {
		const response = await fetch(
			"http:/192.168.1.52:3333/eventsAndGuests",
			{
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);

		const events: EventAndGuests[] = await response.json();
		return events;
	}

	async getById(id: string): Promise<EventAndGuests> {
		const response = await fetch(
			`http:/192.168.1.52:3333/eventsAndGuests/${id}`,{
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
			});
		const event: EventAndGuests = await response.json();
		return event;
	}
}
