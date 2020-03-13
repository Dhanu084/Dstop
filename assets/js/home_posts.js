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
                    let newPost = newPostDom(data.data.post);
                    // $('#available-posts>ul').prepend(newPost);
                    // delePost($('.delete-post-button',newPost));
                },
                error : function(error){
                    console.log(error.responseText);
                }
        });
        });
    }

let newPostDom = function (post) {
    return $(` <li id="post-${ post._id}">
    
    <small><a href="/posts/destroy/${ post._id }>" class="delete-post-button">x</a></small>
    <p class="card-title">${ post.content }</p>
    <p><small>${ post.user.name }</small></p>
    <div>
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="add comment..." required>
                <input type="hidden" name="post" value="${ post.id }">
                <button value="submit"> Add comment </button>
            </form>
    </div>
    <div class="post-comments-list">
        <h6>Comments</h6>
        <ul id="post-comments-list-${post._id}" class=card>
        <li>
       
    </li>
        </ul>
    </div>
</li>`)

  }


let delePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.post._id}`).remove();
            },
            error: function (error) {
                console.log(error);
              }
        })
    })
}




createpost();

}