// testCreateCampaign.ts
import { CampaignType, PrismaClient, UserType } from '@prisma/client';
import { differenceInDays } from 'date-fns';

const prisma = new PrismaClient();
prisma.$connect().then(console.log).catch(console.log);
async function createCampaign() {
  const newUser = await prisma.user.create({
    data: {
      userType: UserType.ADMIN,
      userName: 'Admin',
      email: 'admin@example.com',
      password: 'securepassword',
    },
  });

  const userId = newUser.id;

  const campaignStartAt = new Date('2024-06-01');
  const campaignEndAt = new Date('2024-06-30');
  const campaignDuration = differenceInDays(campaignEndAt, campaignStartAt);

  const newCampaign = await prisma.campaign.create({
    data: {
      userId: userId,
      title: 'New Campaign',
      url: 'https://example.com',
      type: CampaignType.LISTING,
      tag: 'EVENT',
      campaignStartAt: 0,
      campaignEndAt: 0,
      campaignDuration,
      showOnApp: true,
      eventDayTime: 0,
    },
  });
}
async function createDemoInstitution() {
  // const newUser = await prisma.user.create({
  //   data: {
  //     userType:UserType.INSTITUTION,
  //     userName:"Fuad",
  //     email: "fuad@saibbyweb.com",
  //     password: "securepassword",
  //   },
  // });
  const newInstitution = await prisma.institution.createMany({
    data: {
      institutionName: 'Yale University',
      slug: 'yale-university',
      passCode: '123456',
      logo: 'https://mvp-lit-list-dev.s3.eu-west-2.amazonaws.com/og/f564d8c7680b638b9b104266621edd51.svg',
      schoolColor: '#009878',
    },
  });
  console.log(newInstitution);
}
// createCampaign()
//   .catch(e => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
createDemoInstitution()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
