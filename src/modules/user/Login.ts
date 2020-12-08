import { Resolver, Mutation, Arg } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
//import { RegisterInput } from "./register/RegisterInput";
// import { MyCont÷ext } from "src/types/MyContext";

@Resolver()
export class LoginResolver {


  @Mutation(() => User, { nullable: true })
  async login(
      @Arg("email") email: string,
      @Arg("password") password: string,
      // @Ctx() ctx: MyContext 
   ): Promise<User | null> {
    const user = await User.findOne({ where: {email} })

    if (!user){
        return null;
    }
    const valid = await bcrypt.compare(password, user.password)
    if(!valid){
        return null;
    }

    // ctx.req.session!.userId = user.id;//восклицательный знак показывает что он defined. it will send back a cookie

    return user;
  }
}