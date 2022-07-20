export interface GenreList {
    key: string;
    value: string;
}

export interface StarList {
    id: string;
    name: string;
}

export interface Suggestion {
    id: string;
    image: string;
    title: string;
    description: string;
    runtimeStr: string;
    genres: string;
    genreList: GenreList[];
    contentRating: string;
    imDbRating: string;
    imDbRatingVotes: string;
    metacriticRating?: any;
    plot: string;
    stars: string;
    starList: StarList[];
}

export interface Response {
    queryString: string;
    results: Suggestion[];
    errorMessage?: any;
}


