

export default async function GET(req: any, res: any) {
  
    res.setHeader('Set-Cookie', [
        `access_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`,
        `refresh_token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax`
      ]);
    
      console.log("User loged out")
      res.status(200).json({ message: "Logged out successfully" });

}
