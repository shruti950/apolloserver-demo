const fetch = require('cross-fetch')
const { response } = require('../app')
const Books = require('../models/books')
const { findOne, findOneAndRemove } = require('../models/posts')
const Posts = require('../models/posts')
// let Posts = []

// fetch('https://jsonplaceholder.typicode.com/posts',{
//   method : 'GET',
//   headers : {
//     "Content-type" : "application/json;charset=UTF-8"
//   }
// }).then(response=>{
// return  response.json()
// }).then(data=>{
// Posts = data

// })
module.exports  = {
  Query : {
    books : ()=>{
      return Books.find().then(books=>{
        return books
      })
      // return Posts.find().then(post=>post).catch(error=>error)
    },
    book : (parent,id)=>{
      return Books.findById(id.id).then(book=>{
        return book
      })
    },
    posts: (parent,args)=>{
      const perPage = 5;
      return  Posts.find().then(post=>post).then(posts=>{
        const length = posts.length;
        const pageCount = Math.ceil(length/perPage)
        firstIndex = ((perPage)*(args.offset-1));
        lastIndex = firstIndex+perPage
        let post = posts.slice(firstIndex,lastIndex)
        return {"pageCount":pageCount,"post":post}
        // return Posts;
      })

        // const perPage = 5;
    // const length = Posts.length;
    // const pageCount = Math.ceil(length/perPage)
    // firstIndex = ((perPage)*(args.offset-1));
    // lastIndex = firstIndex+perPage
    // let post = Posts.slice(firstIndex,lastIndex)
    // if(post.length === 0){
    //    post = Posts.slice(0,5)
    // }
    // return {"pageCount":pageCount,"post":post}
    // return Posts;
    },
    post :(parent,args)=>{
    //   return Posts.find(post=>{
    //     return post.id === parseInt(args.id)})
    // }

    return Posts.findOne({id:args.id}).then(post=>post)
    }

  },
  Mutation : {
    addBook : (author,args)=>{
      let book = {
        title : args.bookInput.title,
        author : args.bookInput.author
      }
      return new Books(book).save().then(book => {
        return book ;
      })
    },
    addPost : (parent,args)=>{
     return Posts.find().then(posts=>{
       let id;
       if(posts.length){
         id = posts[posts.length-1].id+1
       } else{
         id =1 ;
       }
       let post = {
         userId : args.postInput.userId,
         title : args.postInput.title,
         body : args.postInput.body,
         id : id
       }
       // Posts.push(post)
       // return post;
       return new Posts(post).save().then(post=>{
         return post
       })
     })
    },
    updatePost : (parent,args)=>{
    // const posts = Posts.map(post=>{
    //   if(post.id === parseInt(args.id)){
      const post={
        userId : args.postInput.userId,
        title : args.postInput.title,
        body : args.postInput.body
      }
    //     return post;
    //   }
    // })
    // return Posts.find(post=> post.id === parseInt(args.id))
    return Posts.findOneAndUpdate({id:args.id},{$set: post} ).then(post=>{
       
    })
    },
    deletePost : (parent,args)=>{
    console.log("🚀 ~ file: index.js ~ line 113 ~ args", args)
      // const post = Posts.filter((post,index)=>{
      //   if(post.id === parseInt(args.id)){
      //   Posts.splice(index,1)
      //    return post;
      //   }
      // })
      // return post[0];
    return Posts.findOneAndDelete({id:args.id}).then(post=>{
      return post
    })

    }
  }
}

