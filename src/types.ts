export interface MovieTypes {
  "id": number,
  "name": string,
  "poster_image": string,
  "preview_image": string,
  "background_image": string,
  "background_color": string,
  "description": string,
  "rating": number,
  "scores_count": number,
  "director": string,
  "starring": Array<String>,
  "run_time": number,
  "genre": string,
  "released": number,
  "is_favorite": boolean,
  "video_link": string,
  "preview_video_link": string,
}

export interface CommentTypes {
  "user": {
    "id": number,
    "name": string,
  },
  "rating": number,
  "comment": string,
  "date": string,
}
