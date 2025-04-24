// ===== Fetch & Display Blog Posts =====
fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('post-container');

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'post-card';

      const title = document.createElement('h3');
      title.textContent = post.title;

      const body = document.createElement('p');
      body.textContent = post.body;

      const button = document.createElement('button');
      button.textContent = 'View Comments';
      button.onclick = () => loadComments(post.id, card);

      const commentsDiv = document.createElement('div');
      commentsDiv.className = 'comments';

      card.appendChild(title);
      card.appendChild(body);
      card.appendChild(button);
      card.appendChild(commentsDiv);

      container.appendChild(card);
    });
  });

// ===== Load Comments for a Post =====
function loadComments(postId, card) {
  const commentsDiv = card.querySelector('.comments');
  commentsDiv.textContent = 'Loading comments...';

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => {
      commentsDiv.innerHTML = '';
      comments.forEach(comment => {
        const c = document.createElement('div');
        c.className = 'comment';
        c.innerHTML = `<strong>${comment.name}</strong><br>${comment.body}`;
        commentsDiv.appendChild(c);
      });
    })
    .catch(() => {
      commentsDiv.innerHTML = '<p style="color:red;">Failed to load comments.</p>';
    });
}

// ===== Fetch & Display Albums with Picsum Images =====
fetch('https://jsonplaceholder.typicode.com/albums?_limit=3')
  .then(res => res.json())
  .then(albums => {
    const albumContainer = document.getElementById('album-container');

    albums.forEach(album => {
      const card = document.createElement('div');
      card.className = 'post-card';

      const title = document.createElement('h3');
      title.textContent = `${album.title}`;

      const photoDiv = document.createElement('div');
      photoDiv.className = 'photos';
      photoDiv.id = `photos-${album.id}`;

      card.appendChild(title);
      card.appendChild(photoDiv);
      albumContainer.appendChild(card);

      // Use working fallback image provider
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}&_limit=3`)
        .then(res => res.json())
        .then(photos => {
          photos.forEach(photo => {
            const img = document.createElement('img');
            img.src = `https://picsum.photos/200?random=${photo.id}`;
            img.alt = photo.title;
            img.className = 'album-image';
            photoDiv.appendChild(img);
          });
        })
        .catch(() => {
          photoDiv.innerHTML = '<p style="color:red;">Failed to load images.</p>';
        });
    });
  });
