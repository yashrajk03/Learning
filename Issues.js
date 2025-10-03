// Source: Common issue in inventory management systems
let inventory = { productId123: 10 }; // 10 items in stock

// BUG: Race condition when multiple users buy simultaneously
app.post('/purchase', async (req, res) => {
  const { productId, quantity } = req.body;
  
  // Check inventory
  if (inventory[productId] >= quantity) {
    // Simulate processing time (payment, etc.)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // BUG: Inventory might have changed during the delay
    inventory[productId] -= quantity; // Race condition!
    
    res.json({ success: true, remaining: inventory[productId] });
  } else {
    res.status(400).json({ error: 'Insufficient inventory' });
  }
});

// FIXED VERSION using atomic operations
const locks = new Map(); // Simple in-memory lock

app.post('/purchase', async (req, res) => {
  const { productId, quantity } = req.body;
  
  // Acquire lock
  while (locks.has(productId)) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  locks.set(productId, true);
  
  try {
    if (inventory[productId] >= quantity) {
      await new Promise(resolve => setTimeout(resolve, 100));
      inventory[productId] -= quantity;
      
      res.json({ success: true, remaining: inventory[productId] });
    } else {
      res.status(400).json({ error: 'Insufficient inventory' });
    }
  } finally {
    locks.delete(productId); // Release lock
  }
});

// Better solution: Use database with atomic operations
// UPDATE inventory SET quantity = quantity - ? WHERE product_id = ? AND quantity >= ?

------------------------------------------------------------------------------------------
-> this will basically work for the single node js servers but  if you want to scale it you  have  to use the mutex lock library
// something like this .
const { Mutex } = require('async-mutex');

let inventory = { productId123: 10 };
const mutex = new Mutex(); // creates a lock

app.post('/purchase', async (req, res) => {
  const { productId, quantity } = req.body;

  // acquire lock
  const release = await mutex.acquire();

  try {
    if (inventory[productId] >= quantity) {
      await new Promise(resolve => setTimeout(resolve, 100)); // simulate delay
      inventory[productId] -= quantity;
      res.json({ success: true, remaining: inventory[productId] });
    } else {
      res.status(400).json({ error: 'Insufficient stock' });
    }
  } finally {
    // always release
    release();
  }
});

