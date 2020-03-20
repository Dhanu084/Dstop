{
    let createpost = function(){
        console.log("running");
        let newPostForm = $("#new-post-form");

        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.posts);
                    $('#available-posts>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                    
                    
                },
                error : function(error){
                    console.log(error.responseText);
                }
        });
        });
    }

let newPostDom = function (posts) {
    return $(`   
    <li id="post-${ posts._id }"> 
       
        <small><a class="delete-post-button" href="/posts/destroy/${ posts._id }">x</a></small>
        <p class="card-title">${ posts.content }</p>
        <p><small>${ posts.user.name }</small></p>
        <div>
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="add comment..." required>
                    <input type="hidden" name="post" value="${ posts.id }">
                    <button value="submit"> Add comment </button>
                </form>
        </div>
        <div class="post-comments-list">
            <h6>Comments</h6>
            <ul id="post-comments-list-${ posts.id}" class=card>
                
                
            </ul>
        </div>
    </li>
    

`)

  }


let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                console.log(data.data);
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function (error) {
                console.log(error.responseText);
              }
        })
    })
}

// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        console.log(postId);
        new PostComments(postId);
    });
}


createpost();
convertPostsToAjax();
}