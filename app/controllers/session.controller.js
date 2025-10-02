import { SessionDTO } from '../dto/session.dto.js';

export const SessionController = {
  current(req, res) {
    const dto = new SessionDTO(req.user);
    res.status(200).json({ status: 'success', user: dto.toResponse() });
  }
};
