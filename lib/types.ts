import { Prisma } from "../src/generated/prisma/client.js";

export type productWithRelation = Prisma.project_tabGetPayload<{
  include: {
    makwenat: {
        include:{
            motabaa_fanya:true,
            motabaa_Maly: true,
        motabaa_Qanwn: true,
        }
    };
    
  };
}>;

