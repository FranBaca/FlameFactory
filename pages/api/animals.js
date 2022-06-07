import { faker } from '@faker-js/faker';

const animals = Array.from({length: 5}).map((_, n) => ({
  id: n + 1,
  name: faker.name.firstName(),
  animal: faker.animal.cetacean(),
}))

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(animals);
    return;
  }

  if (req.method === "POST") {
    animals.push({
      id: animals.length,
      ...req.body,
    });
    res.status(201).json(animals);
    return;
  }
}
