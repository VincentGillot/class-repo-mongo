import { SessionRepo } from "../dal/session/SessionRepo";
import { UserRepo } from "../dal/user/UserRepo";
import { Password } from "./Password";
import { JWT } from "./JWT";
import { Mailer } from "./Mailer";
export declare class BLL {
    static user: UserRepo;
    static session: SessionRepo;
    static password: typeof Password;
    static jwt: typeof JWT;
    static mailer: Mailer;
}
//# sourceMappingURL=BLL.d.ts.map