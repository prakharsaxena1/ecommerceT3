import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Define the data to be inserted
const interestsData = [
  { productId: 1, product: 'Bacon' },
  { productId: 2, product: 'Shirt' },
  { productId: 3, product: 'Ball' },
  { productId: 4, product: 'Towels' },
  { productId: 5, product: 'Car' },
  { productId: 6, product: 'Chair' },
  { productId: 7, product: 'Fish' },
  { productId: 8, product: 'Sausages' },
  { productId: 9, product: 'Hat' },
  { productId: 10, product: 'Gloves' },
  { productId: 11, product: 'Computer' },
  { productId: 12, product: 'Pizza' },
  { productId: 13, product: 'Pants' },
  { productId: 14, product: 'Keyboard' },
  { productId: 15, product: 'Cheese' },
  { productId: 16, product: 'Bike' },
  { productId: 17, product: 'Mouse' },
  { productId: 18, product: 'Shoes' },
  { productId: 19, product: 'Salad' },
  { productId: 20, product: 'Table' },
  { productId: 21, product: 'Tuna' },
  { productId: 22, product: 'Soap' },
  { productId: 23, product: 'Chicken' },
  { productId: 24, product: 'Chips' }
];

async function main() {
  // Loop through the interests data and insert into the database
  for (const interestData of interestsData) {
    await prisma.interests.create({
      data: {
        productId: interestData.productId,
        productName: interestData.product // Change 'product' to 'productName'
      }
    });
  }

  console.log('Interests seeded successfully!');
}

// Call the main function
void main();
