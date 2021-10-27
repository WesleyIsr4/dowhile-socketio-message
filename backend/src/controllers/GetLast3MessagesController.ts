import { Request, Response } from "express";
import { GetLast3Messages } from "../services/GetLast3Messages";

class GetLast3MessagesController {
  async handle(request: Request, response: Response) {
    const service = new GetLast3Messages();

    const result = await service.execute();

    return response.json(result);
  }
}

export { GetLast3MessagesController };
