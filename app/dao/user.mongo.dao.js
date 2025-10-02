import { BaseDAO } from "./base.dao.js";
import { User } from "../../config/models/user.model.js";

export class UserMongoDAO extends BaseDAO {
    constructor() { super(User); }

}