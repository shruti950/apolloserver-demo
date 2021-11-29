const fetch = require('cross-fetch')
const { response } = require('../app')
const Books = require('../models/books')
const { findOne, findOneAndRemove } = require('../models/posts')
const Posts = require('../models/posts')
const Payments = require('../models/payment')
const stripe = require("stripe")("sk_test_51JXgciSJ5cEtd8TEeOtKGki51bTC8HJnwpgbqVTklNrZKStNdaSVyo8W1yneyvQvhpcDklvZq1IaSmC0QSuwnd4O00bN6ZGlzj");
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
  postType : {
    FOOD : 'Food',
    ANIMAL : 'Animal',
    CRIME : 'Crime',
    SURGERY : 'Surgery'
  },
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
        if(args.offset){
          const length = posts.length;
          const pageCount = Math.ceil(length/perPage)
          firstIndex = ((perPage)*(args.offset-1));
          lastIndex = firstIndex+perPage
          let post = posts.slice(firstIndex,lastIndex)
          return {"pageCount":pageCount,"post":post}
        }
        else{
          return  {"pageCount":null,"post":posts};
        }
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

    return Posts.findOne({id:args.id}).then(post=>{
      console.log("🚀 ~ file: index.js ~ line 68 ~ returnPosts.findOne ~ post", post)
     return post})
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
    console.log("🚀 ~ file: index.js ~ line 82 ~ args", args)
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
         type : args.postInput.type,
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
    console.log("🚀 ~ file: index.js ~ line 107 ~ args", args)
    // const posts = Posts.map(post=>{
    //   if(post.id === parseInt(args.id)){
      const post={
        userId : args.postInput.userId,
        title : args.postInput.title,
        body : args.postInput.body,
        type : args.postInput.type
      }
      console.log("🚀 ~ file: index.js ~ line 113 ~ post", post)
    //     return post;
    //   }
    // })
    // return Posts.find(post=> post.id === parseInt(args.id))
    return Posts.findOneAndUpdate({id:args.id},{$set: post} ).then(post=>{
       return post
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

    },
    addPayment : (parent,args)=>{
    console.log("🚀 ~ file: index.js ~ line 140 ~ args", args)
    stripe.customers
      .create({
        name: args.paymentInput.name,
        email: args.paymentInput.email,
        source: args.paymentInput.token
      }).then(customer=>{
      console.log("🚀 ~ file: index.js ~ line 149 ~ customer", customer)
        stripe.charges.create({amount :args.paymentInput.amount,currency :args.paymentInput.currency,customer :customer.id},res=>(stripeErr, stripeRes) => {
          if (stripeErr) {
            res.status(500).send({ error: stripeErr });
          } else {
            res.status(200).send({ success: stripeRes });
          }
        });
      })
    return Payments(args.paymentInput).save().then(payment=>{
      console.log("🚀 ~ file: index.js ~ line 152 ~ returnPayments ~ payment", payment)
      return payment}).catch(error=>error)
    }
  }
}

