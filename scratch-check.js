import * as lucide from 'lucide-react';
console.log('exact match:', Object.keys(lucide).filter(key => key.toLowerCase() === 'linkedin'));
console.log('contains match:', Object.keys(lucide).filter(key => key.toLowerCase().includes('linkedin')));
