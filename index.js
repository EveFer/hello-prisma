import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Connect the client
    await prisma.$connect()
    // ... you will write your Prisma Client queries here
    const data = {
        email: 'fer@devkoore.com',
        name: 'Fernanda Palacios',
        posts: {
            create: {
                title: 'My first post',
                body: 'Lots of really interesting stuff',
                slug: 'my-first-post',
              }
        }
    }
    // const userCreated = await prisma.user.create({data})
    // console.log(userCreated)


    const allUsers = await prisma.user.findMany({
        include: {
          posts: { 
            select: { id: true, slug: true, title: true, body: true, comments: true } 
          }
        },
        
        // select: {
        //     posts: {
        //         comments: true
        //     }
        // }
      })
    console.dir(allUsers, { depth: null })

    // update a post
    // const postUpdate = await prisma.post.update({
    //     where: {
    //       slug: 'my-first-post',
    //     },
    //     data: {
    //       comments: {
    //         createMany: {
    //           data: [
    //             { comment: 'Great post!' },
    //             { comment: "Can't wait to read more!" },
    //           ],
    //         },
    //       },
    //     },
    //   })
    // console.log(postUpdate)

    // get posts
    // const posts = await prisma.post.findMany({
    //     include: {
    //       comments: true,
    //     },
    //   })
    
    // console.dir(posts, { depth: Infinity })
}

main()
 .then(async() => {
    await prisma.$disconnect()
 })
 .catch(async(e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
 })