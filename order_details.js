async function fetchInventory(productType, itemId) {
  try {
    const response = await fetch(
      `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/inventory/${productType}/${itemId}`,
    );
    const data = await response.json();
    return {
      name: itemId,
      inventory: data.stock || 0,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching ${productType} inventory:`, error);
    return {
      name: itemId,
      inventory: 0,
    };
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const orderNameElement = document.getElementById('orderName');
  const orderSoilElement = document.getElementById('orderSoil');
  const orderPotElement = document.getElementById('orderPot');
  const orderPotMaterialElement = document.getElementById('orderPotMaterial');
  const orderPotStyleElement = document.getElementById('orderPotStyle');
  const orderExtrasElement = document.getElementById('orderExtras');
  const orderImagesContainer = document.getElementById('orderImages');
  const inventoryAlertElement = document.getElementById('inventoryAlert');
  const orderNowButton = document.getElementById('orderNowButton');
  const caringTipsElement = document.getElementById('caringTips');
  const inventoryAlertsContent = document.getElementById(
    'inventoryAlertsContent',
  );
  const priceBreakdownContent = document.getElementById(
    'priceBreakdownContent',
  );

  const storedOrder = JSON.parse(localStorage.getItem('recommendation'));

  if (storedOrder) {
    orderNameElement.textContent = storedOrder.name;
    orderSoilElement.textContent = storedOrder.soil;
    orderPotElement.textContent = storedOrder.pot;
    orderPotMaterialElement.textContent = storedOrder.potMaterial;
    orderPotStyleElement.textContent = storedOrder.potStyle;
    orderExtrasElement.textContent = storedOrder.extras.join(', ');

    const images = [
      `./assets/images/pot-${storedOrder.potMaterial.toLowerCase()}-${
        storedOrder.potStyle === 'Decorated pot' ? 'decorated-' : ''
      }${storedOrder.potColor.toLowerCase()}.png`,
      `./assets/images/plant-${storedOrder.name}.png`,
      `./assets/images/soil-${storedOrder.soil.replace(' Soil', '')}.png`,
    ];

    storedOrder.extras.forEach((extra) => {
      images.push(`./assets/images/${extra}.png`);
    });

    images.forEach((imageSrc) => {
      const imageElement = document.createElement('img');
      imageElement.src = imageSrc;
      orderImagesContainer.appendChild(imageElement);
    });

    const imgPlant = document.createElement('img');
    imgPlant.src = `./assets/images/plant-${storedOrder.name}.png`;
    orderImagesContainer.appendChild(imgPlant);
  }

  try {
    const inventoryResponses = await Promise.all([
      fetchInventory('plant', storedOrder.name),
      fetchInventory('pot', storedOrder.potMaterial.toLowerCase()),
      fetchInventory(
        'soil',
        storedOrder.soil.toLowerCase().replace(' soil', ''),
      ),
    ]);

    const inventoryAlertMessages = {
      inStock: {
        message: 'In Stock',
        color: '#4CAF50',
        check: (inventory) => inventory > 10,
      },
      limitedStock: {
        message:
          'One of the items in your order has limited stock. Order soon!',
        color: '#FFC107',
        check: (inventory) => inventory > 0 && inventory <= 10,
      },
      outOfStock: {
        message:
          'One of the items in your order is out of stock. Please check the inventory alerts.',
        color: 'red',
        check: (inventory) => inventory === 0,
      },
    };

    let inventoryAlertType = 'inStock';
    // eslint-disable-next-line no-restricted-syntax
    for (const response of inventoryResponses) {
      // eslint-disable-next-line no-restricted-syntax
      for (const messageType in inventoryAlertMessages) {
        if (inventoryAlertMessages[messageType].check(response.inventory)) {
          inventoryAlertType = messageType;
          break;
        }
      }
    }

    inventoryAlertElement.textContent =
      inventoryAlertMessages[inventoryAlertType].message;
    inventoryAlertElement.style.backgroundColor =
      inventoryAlertMessages[inventoryAlertType].color;

    if (inventoryAlertType !== 'inStock') {
      orderNowButton.disabled = true;
    }

    inventoryAlertsContent.innerHTML = '';

    inventoryResponses.forEach((response) => {
      const inventoryAlertItem = document.createElement('p');
      inventoryAlertItem.textContent = `${response.name}: ${
        response.inventory > 0
          ? `In Stock (${response.inventory})`
          : 'Out of Stock'
      }`;
      inventoryAlertsContent.appendChild(inventoryAlertItem);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching inventory:', error);
    inventoryAlertElement.textContent = 'Error fetching inventory.';
    inventoryAlertElement.style.backgroundColor = '#FF5722';
    orderNowButton.disabled = true;
  }

  if (storedOrder) {
    try {
      const response = await fetch(
        `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/info/${storedOrder.name}`,
      );
      const data = await response.json();

      const descriptionElement = document.getElementById(
        'plantDescriptionContent',
      );
      descriptionElement.innerHTML = `<p>${data.description}</p>`;

      const caringTipsAccordionContent =
        document.getElementById('caringTipsContent');
      caringTipsAccordionContent.innerHTML = '';

      // eslint-disable-next-line no-shadow
      const caringTipsElement = document.createElement('div');
      caringTipsElement.classList.add('caring-tips-category');

      const caringTipsTitleElement = document.createElement('h4');
      caringTipsTitleElement.textContent = 'Caring Tips';
      caringTipsElement.appendChild(caringTipsTitleElement);

      const caringTipsListElement = document.createElement('ul');
      Object.keys(data.care).forEach((category) => {
        const tipItem = document.createElement('li');

        const tipImage = document.createElement('img');
        tipImage.src = `./assets/images/${category.toLowerCase()}.svg`;
        tipItem.appendChild(tipImage);

        const tipText = document.createElement('span');
        tipText.innerHTML = `<strong>${category}:</strong> ${data.care[category]}`;
        tipItem.appendChild(tipText);

        caringTipsListElement.appendChild(tipItem);
      });

      caringTipsElement.appendChild(caringTipsListElement);
      caringTipsAccordionContent.appendChild(caringTipsElement);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching plant details:', error);
      caringTipsElement.textContent = 'Error fetching caring tips.';
    }
  }

  // Desglose de precios
  const priceBreakdownTitleElement = document.createElement('h4');
  priceBreakdownTitleElement.textContent = 'Price Breakdown'; // Cambiar el contenido del título si lo deseas
  priceBreakdownContent.appendChild(priceBreakdownTitleElement);

  const priceListElement = document.createElement('ul');
  const priceData = {
    aglaonema: 12.99,
    aloe: 5.25,
    'Boston Fern': 10.25,
    Cactus: 8.25,
    monstera: 18.0,
    peaceLily: 8.75,
    Sansevieria: 5.75,
    Clay: 3.0,
    Ceramic: 5.0,
    'Decorated pot': 6.0,
    composted: 3.25,
    fertilized: 5.0,
    drainage: 5.5,
    'Moss-pole': 2.25,
    Pebbles: 2.0,
    'mini-plants': 3.75,
    Pink: 4.0,
    Blue: 4.0,
    Green: 4.0,
    Purple: 4.0,
  };

  let totalPrice = 0;
  const selectedItems = {
    [storedOrder.name]: true,
    [storedOrder.potMaterial]: true,
    [storedOrder.potStyle]: true,
    [storedOrder.potColor]: true,
    [storedOrder.soil]: true,
    ...storedOrder.extras.reduce((acc, extra) => {
      acc[extra] = true;
      return acc;
    }, {}),
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const item in priceData) {
    if (selectedItems[item]) {
      const priceItem = document.createElement('li');
      const price = priceData[item];
      priceItem.textContent = `${item}: $${price.toFixed(2)}`;
      priceListElement.appendChild(priceItem);
      totalPrice += price;
    }
  }

  const totalItem = document.createElement('li');
  totalItem.textContent = `Total: $${totalPrice.toFixed(2)}`;
  priceListElement.appendChild(totalItem);

  priceBreakdownContent.appendChild(priceListElement);

  const headers = document.querySelectorAll('.more-info-stock-header');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      header.classList.toggle('active');
      const content = header.nextElementSibling;
      content.classList.toggle('active');

      headers.forEach((otherHeader) => {
        if (otherHeader !== header) {
          otherHeader.classList.remove('active');
          otherHeader.nextElementSibling.classList.remove('active');
        }
      });
    });
  });
});
