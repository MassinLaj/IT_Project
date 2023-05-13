// Importeer de MongoDB client
import { MongoClient } from 'mongodb';
// Importeer bcrypt om wachtwoorden te hashen
import bcrypt from 'bcrypt';

// Maak een verbinding met de MongoDB database
const uri = 'mongodb+srv://admin:4C8iudqthXifyqcp@userdata.rvqrjld.mongodb.net/Accounts?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Functie om een gebruiker te registreren
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    // Hash het wachtwoord
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verbind met de database
    await client.connect();

    // Selecteer de "users" collectie
    const usersCollection = client.db('mydatabase').collection('users');

    // Voeg de nieuwe gebruiker toe aan de database
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword
    });

    // Sluit de database verbinding
    await client.close();

    // Return het resultaat van de insert operatie
    return result;
  } catch (err) {
    console.log(err);
  }
};

// Functie om een gebruiker in te loggen
export const loginUser = async (email: string, password: string) => {
  try {
    // Verbind met de database
    await client.connect();

    // Selecteer de "users" collectie
    const usersCollection = client.db('mydatabase').collection('users');

    // Vind de gebruiker met de opgegeven e-mail
    const user = await usersCollection.findOne({ email });

    // Als er geen gebruiker gevonden wordt, geef dan null terug
    if (!user) {
      return null;
    }

    // Controleer of het opgegeven wachtwoord overeenkomt met het opgeslagen wachtwoord
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Als het wachtwoord ongeldig is, geef dan null terug
    if (!isPasswordValid) {
      return null;
    }

    // Sluit de database verbinding
    await client.close();

    // Return de gevonden gebruiker
    return user;
  } catch (err) {
    console.log(err);
  }
};
