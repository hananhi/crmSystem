
export const getUser= async(req,res,next)=>{

    try {
        const { email, password } = req.body;
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().signInWithEmailAndPassword(email, password);
        // Handle successful login and user session management
        res.status(200).send('Login successful');
      } catch (error) {
        console.error('Error logging in:', error);
        res.status(401).send('Login failed');
      }

}



export const createUser= async(req,res,next)=>{
    

    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().createUser({
          email,
          password,
        });
        // Handle success and store user data in your MySQL database if needed
        res.status(200).send('User registered successfully');
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Registration failed');
      }
}