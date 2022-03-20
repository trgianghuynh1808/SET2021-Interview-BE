// INFO: this method will sort containers base on
// unitPrice = totalCost / container
function containerSorter(a, b) {
  const unitPriceA = a.totalCost / a.container;
  const unitPriceB = b.totalCost / b.container;

  if (unitPriceA < unitPriceB) {
    return -1;
  }

  if (unitPriceA > unitPriceB) {
    return 1;
  }

  // INFO: when 2 unit prices are equal, we will choose larger number of containers
  if (a.container > b.container) {
    return -1;
  }

  return 0;
}

function rentContainer(neededContainer, listings) {
  const sortedListings = listings.sort(containerSorter);
  let result = [];
  let containerNumbers = 0;
  let totalCost = 0;

  for (const item of sortedListings) {
    if (containerNumbers + item.container > neededContainer) {
      continue;
    }

    containerNumbers += item.container;
    totalCost += item.totalCost;
    result.push(item);

    if (containerNumbers === neededContainer) {
      break;
    }
  }

  return {
    result,
    containerNumbers,
    totalCost,
  };
}

function logger(rentInfo, neededContainer) {
  const { result, containerNumbers, totalCost } = rentInfo;

  if (result.length === 0) {
    console.log("No data");
  }

  result.forEach((item) => {
    console.log(
      `[Contract with] ${item.name} ${item.container} container, price: ${item.totalCost}`
    );
  });

  if (containerNumbers < neededContainer) {
    console.log(`Not enough containers`);
  }

  console.log(`[Summary] total cost ${totalCost}`);
}

// INFO: TEST CASE 1
// const neededContainer = 3;
// const listings = [
//   {
//     name: "Container renter A",
//     container: 1,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter B",
//     container: 2,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter C",
//     container: 3,
//     totalCost: 3,
//   },
// ];

// INFO: TEST CASE 2
// const neededContainer = 10;
// const listings = [
//   {
//     name: "Container renter A",
//     container: 5,
//     totalCost: 5,
//   },
//   {
//     name: "Container renter B",
//     container: 2,
//     totalCost: 10,
//   },
//   {
//     name: "Container renter C",
//     container: 2,
//     totalCost: 3,
//   },
// ];

//INFO: TEST CASE 3
const neededContainer = 10;
const listings = [
  {
    name: "Container renter A",
    container: 5,
    totalCost: 5,
  },
  {
    name: "Container renter B",
    container: 2,
    totalCost: 10,
  },
  {
    name: "Container renter C",
    container: 10,
    totalCost: 3,
  },
];

// INFO: OTHER TEST CASE
// const neededContainer = 3;
// const listings = [
//   {
//     name: "Container renter A",
//     container: 1,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter B",
//     container: 1,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter C",
//     container: 5,
//     totalCost: 1,
//   },
//   {
//     name: "Container renter C",
//     container: 1,
//     totalCost: 1,
//   },
// ];

const rentInfo = rentContainer(neededContainer, listings);
logger(rentInfo, neededContainer);
