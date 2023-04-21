import { SessionRepo } from "../dal/session/SessionRepo";
import { UserRepo } from "../dal/user/UserRepo";
import { Password } from "./Password";
import { JWT } from "./JWT";
import { Mailer } from "./Mailer";
class BLL {
    static user = new UserRepo();
    static session = new SessionRepo();
    static password = Password;
    static jwt = JWT;
    static mailer = new Mailer();
}
export { BLL };
