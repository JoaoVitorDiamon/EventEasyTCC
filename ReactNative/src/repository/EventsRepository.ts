import type { Events } from "../entity/Event";
import type { IBaseRepository } from "./IBaseRepository";

export class EventsRepository implements IBaseRepository<Events> {
	async create(event: Events): Promise<Events> {
		const response = await fetch(
			"https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/event",
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
		const createdEvent: Events = await response.json();
		return createdEvent;
	}
	async update(event: Events, id: string): Promise<Events> {
		const response = await fetch(
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/event/${id}`,
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
		const updateEvent: Events = await response.json();
		return updateEvent;
	}
	async delete(id: string): Promise<Events | true> {
		const response = await fetch(
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/event/${id}`,
			{
				method: "DELETE",
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);
		return response.status === 204 ? true : await response.json();
	}

	async getAll(): Promise<Events[]> {
		const response = await fetch(
			"https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/event",
			{
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
			},
		);

		const events: Events[] = await response.json();
		return events;
	}

	async getById(id: string): Promise<Events> {
		const response = await fetch(
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/events/${id}`,{
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
			});
		const event: Events = await response.json();
		return event;
	}
	async getByUserId(userID: string): Promise<Events> {
		const response = await fetch(
			`https://7e40-2804-47e4-8879-8400-2d14-62e4-5bc8-a69d.ngrok-free.app/${userID}/events`,{
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
			});
		const event: Events = await response.json();
		return event;
	}
}
