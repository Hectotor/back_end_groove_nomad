import NextAuth from 'next-auth';

// Configuration simple avec un utilisateur en dur
const handler = NextAuth({
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        // Vérification simple avec un utilisateur en dur
        if (credentials?.email === 'admin@example.com' && credentials?.password === 'admin123') {
          return { id: '1', name: 'Admin', email: 'admin@example.com' };
        }
        return null;
      }
    }
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: 'votre-secret-tres-long-et-secure',
  debug: true
});

export { handler as GET, handler as POST };
