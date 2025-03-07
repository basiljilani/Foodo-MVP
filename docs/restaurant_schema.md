# Restaurant Data Schema

This document outlines the data structure for restaurants in the Foodo-MVP application.

## Basic Information
- `id`: Unique identifier (string)
- `name`: Restaurant name
- `logo`: URL to restaurant logo
- `coverImage`: URL to restaurant cover image
- `rating`: Numerical rating (0-5)
- `cuisine`: Type of cuisine
- `deliveryTime`: Estimated delivery time (e.g., "30-45 min")
- `deliveryFee`: Delivery fee amount
- `minimumOrder`: Minimum order amount

## Branding
- `slogan`: Restaurant slogan
- `themeColor`: Primary brand color (hex)
- `textColor`: Text color to use with theme color (for contrast)
- `since`: Year established

## Contact Information
- `address`: Physical address
- `phone`: Contact phone number
- `email`: Contact email
- `website`: Official website URL

## Social Media
- `facebook`: Facebook page URL
- `instagram`: Instagram profile URL
- `twitter`: Twitter profile URL
- `whatsapp`: WhatsApp number

## Location
- `lat`: Latitude coordinate
- `lng`: Longitude coordinate

## Hours of Operation
- `monday`: Opening hours for Monday
- `tuesday`: Opening hours for Tuesday
- `wednesday`: Opening hours for Wednesday
- `thursday`: Opening hours for Thursday
- `friday`: Opening hours for Friday
- `saturday`: Opening hours for Saturday
- `sunday`: Opening hours for Sunday

## Menu Categories
Array of categories, each containing:
- `id`: Category identifier
- `name`: Category name
- `description`: Category description

## Menu Items
Array of items, each containing:
- `id`: Item identifier
- `categoryId`: Reference to parent category
- `name`: Item name
- `description`: Item description
- `price`: Item price
- `image`: URL to item image
- `popular`: Boolean indicating if item is popular
- `vegan`: Boolean indicating if item is vegan
- `vegetarian`: Boolean indicating if item is vegetarian
- `glutenFree`: Boolean indicating if item is gluten-free

## Ads/Promotions
Array of ads, each containing:
- `id`: Ad identifier
- `title`: Ad title
- `description`: Ad description
- `image`: URL to ad image
- `startDate`: Start date of promotion
- `endDate`: End date of promotion
- `url`: URL for more information (optional)
