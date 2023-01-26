const { hashSync } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Alex',
        email: '1@1',
        hashpass: hashSync('1', 2),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Bob',
        email: '2@2',
        hashpass: hashSync('2', 2),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'Charlie',
        email: '3@3',
        hashpass: hashSync('3', 2),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

    await queryInterface.bulkInsert('Cars', [
      {
        brand: 'BMW',
        model: 'x5',
        photo: 'https://avatars.mds.yandex.net/get-autoru-vos/5361123/c2c86b165e16875f863e125b07f45b7b/456x342n',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: 'Chevrolet',
        model: 'Camaro',
        photo: 'https://avatars.mds.yandex.net/get-verba/216201/2a000001673c67e5a251c78daaa2ad46bcc7/cattouch',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: 'Mitsubishi',
        model: 'Evolution',
        photo: 'https://quto.ru/service-imgs/4c/ed/3e/77/4ced3e77a6291.jpeg',
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: 'Ford',
        model: 'Mustang',
        photo: 'https://s0.rbk.ru/v6_top_pics/media/img/8/64/756705114003648.jpg',
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: 'Ford',
        model: 'Explorer',
        photo: 'https://s.auto.drom.ru/i24195/c/photos/fullsize/ford/explorer/ford_explorer_109730.jpg',
        ownerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        brand: 'Mercedes',
        model: 'GLC',
        photo: 'https://www.mercedes-benz.ru/passengercars/mercedes-benz-cars/models/glc/suv-x253/_jcr_content/image.MQ6.2.2x.20210728111702.png',
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
