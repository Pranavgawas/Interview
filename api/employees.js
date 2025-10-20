const admin = require('firebase-admin');

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CERT_URL
    })
  });
}

const db = admin.firestore();

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const employeesCollection = db.collection('employees');
  const { id } = req.query;

  try {
    // GET single employee by ID
    if (req.method === 'GET' && id) {
      const doc = await employeesCollection.doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      return res.status(200).json({ id: doc.id, ...doc.data() });
    }

    // GET all employees
    if (req.method === 'GET') {
      const snapshot = await employeesCollection.get();
      const employees = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return res.status(200).json(employees);
    }

    // POST - Create new employee
    if (req.method === 'POST') {
      const employeeData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await employeesCollection.add(employeeData);
      const newDoc = await docRef.get();

      return res.status(201).json({ id: newDoc.id, ...newDoc.data() });
    }

    // PUT - Update employee
    if (req.method === 'PUT' && id) {
      const employeeRef = employeesCollection.doc(id);
      const doc = await employeeRef.get();

      if (!doc.exists) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      await employeeRef.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      const updatedDoc = await employeeRef.get();
      return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
    }

    // DELETE employee
    if (req.method === 'DELETE' && id) {
      const employeeRef = employeesCollection.doc(id);
      const doc = await employeeRef.get();

      if (!doc.exists) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      await employeeRef.delete();
      return res.status(200).json({ message: 'Employee deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: error.message });
  }
};
