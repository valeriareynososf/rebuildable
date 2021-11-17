'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert(
     "Posts",
     [
       {
         title: "LEGO SET 10283-1 - NASA Space Shuttle Discovery",
         imgUrl:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/1000x800p.jpeg",
         userId: 1,
         details: `Five Space Shuttle Orbiters made up NASA’s Space Transportation System (STS)
fleet – Columbia, Challenger, Discovery, Atlantis and Endeavour. Combined, they flew
135 missions carrying 355 people into space. Discovery flew the most missions, carrying
the highest number of passengers, while traveling further and higher than the other
orbiters. It also was Discovery’s assignment to launch and deploy the Hubble Space
Telescope in April 1990 as part of the STS-31 mission. In 2021, the 40th Anniversary of the
Space Shuttle Program, we take the opportunity to revisit this famous mission.`,
         instructions:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/shuttleinstructions.png",
       },
       {
         title:
           "MOC - Six Axis (6DoF) Robotic Arm with Interchangeable End Effectors",
         imgUrl:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/robotic.jpeg",
         userId: 2,
         details: `This is a compact and agile 6 axis (6DoF) robotic arm powered by LEGO Mindstorms EV3. It supports interchangeable end effectors and can be wirelessly controlled by a PS4 Dualshock controller.`,
         instructions:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/shuttleinstructions.png",
       },
       {
         title: "LEGO SET 42127 - THE BATMAN - BATMOBILE™",
         imgUrl:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/batmobile.png",
         userId: 3,
         details: `Super-hero fans will enjoy a thrilling challenge as they build the iconic BATMOBILE™ car in LEGO® Technic™ form. Inspired by the latest version of the BATMOBILE from the 2022 THE BATMAN movie, this highly detailed toy car building set features a true-to-life design and is packed with hot features. `,
         instructions:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/shuttleinstructions.png",
       },
       {
         title: "MOC - Caterpillar M322D wheel excavator (42043 C-model)",
         imgUrl:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/excavator.jpeg",
         userId: 4,
         details: `Wheeled excavator built just from 1 model parts (42043 Mercedes Benz), with many functions`,
         instructions:
           "https://capstone-profile.s3.us-west-1.amazonaws.com/shuttleinstructions.png",
       },
     ],
     {}
   );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Posts", null, {});
  }
};
