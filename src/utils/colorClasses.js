// Utility to map operator color key to Tailwind class strings
const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    bgSolid: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-700',
    textSolid: 'text-white'
  },
  purple: {
    bg: 'bg-purple-50',
    bgSolid: 'bg-purple-500',
    border: 'border-purple-500',
    text: 'text-purple-700',
    textSolid: 'text-white'
  },
  green: {
    bg: 'bg-green-50',
    bgSolid: 'bg-green-500',
    border: 'border-green-500',
    text: 'text-green-700',
    textSolid: 'text-white'
  },
  red: {
    bg: 'bg-red-50',
    bgSolid: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-red-700',
    textSolid: 'text-white'
  },
  yellow: {
    bg: 'bg-yellow-50',
    bgSolid: 'bg-yellow-500',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    textSolid: 'text-white'
  },
  pink: {
    bg: 'bg-pink-50',
    bgSolid: 'bg-pink-500',
    border: 'border-pink-500',
    text: 'text-pink-700',
    textSolid: 'text-white'
  },
  indigo: {
    bg: 'bg-indigo-50',
    bgSolid: 'bg-indigo-500',
    border: 'border-indigo-500',
    text: 'text-indigo-700',
    textSolid: 'text-white'
  },
  gray: {
    bg: 'bg-gray-50',
    bgSolid: 'bg-gray-500',
    border: 'border-gray-500',
    text: 'text-gray-700',
    textSolid: 'text-white'
  }
};

export function getColorClasses(colorKey) {
  return colorMap[colorKey] || colorMap.gray;
}

export default { getColorClasses };
