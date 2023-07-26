class ApiFeatures {

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    //search keyword for name

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",//in case sensitive
                }
            } : {};
        this.query = this.query.find({ ...keyword })
        return this
    } 
 

    filter() {

        const querycopy = { ...this.queryStr }
        console.log(querycopy)
        // removing somefield from category 
        const removefield = ["keyword", "page", "limit"]
        removefield.forEach(key => delete querycopy[key])

        // this.query=this.query.find(querycopy)

        // console.log(this.query)
        // return this 


        //filter for price and rating----
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`)
        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryStr);
        return this
    }


    //pagination------
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};
module.exports = ApiFeatures              