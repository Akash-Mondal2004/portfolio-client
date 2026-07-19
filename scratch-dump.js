import * as lucide from 'lucide-react';
import fs from 'fs';
fs.writeFileSync('all-keys.json', JSON.stringify(Object.keys(lucide), null, 2));
