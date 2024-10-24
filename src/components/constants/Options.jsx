export const SelectBudgetOptions = [
    {
        id:1,
        icon: "💵",
        title:"Cheap",
        desc: "Economize and Save"
    },
    {
        id: 2,
        icon: "💰",
        title:"Moderate",
        desc: "Balance Cost and Comfort"
    },
    {
        id:3,
        icon: "💎",
        title:"Luxury",
        desc: "Induldge without Limits"
    }
]

export const SelectNoOfPersons = [
    {
        id:1,
        icon: "🚶",
        title: "Solo",
        desc: "Discovering on Your Own",
        no: "1 Person"
    },
    {
        id:2,
        icon: "👨‍👩‍👧‍👦",
        title: "Family",
        desc: "Fun for All Ages",
        no: "2 to 5 People"
    },
    {
        id:3,
        icon: "🤝",
        title: "Friends",
        desc: "Adventure with Your Crew",
        no: "5 to 10 People"
    }
]

  
  
export const PROMPT = "Create an optimal trip itinerary based on the specified location, duration, budget, number of persons, and mode of transport.Generate Travel Plan for Location: {location} for no of days: {noOfDays} Days with no of People or group: {People} with Budget: {Budget}. Provide a list of hotels with hotel name, description, address, rating, price, location in map, coordinates, image URL. Also, create the itinerary for {noOfDays} days, suggest places, give name, details, pricing, timings, place image URLs, and location (coordinate or in map). Ensure all are within the {Budget} level. Important: provide the result in JSON Format"