'use strict'

/**
 * Generic controller
 * @author Jeferson Passos
 *
 * @class Controller
 */
class Controller {

    //
    /**
     *  Return registers
     *  Pagination register
     *  Default: page 1 and 20 registers
     *
     * @returns
    //  * @memberof Controller
     */
    async index({ request }){
        const { page, limit } = await request.get()

        if(!page)
          return this.model.query().paginate(1, parseInt(limit));

        return this.model.query().paginate(page, parseInt(limit));
    }

    /**
     * Find one register by id
     *
     * @param {*} { params }
     * @returns
     * @memberof Controller
     */
    async show({ params }){

        let values = await this.model.find(params.id)


        if(this.model.schema.relationships != undefined &&
            this.model.schema.relationships.length > 0){
            await values.loadMany(this.model.schema.relationships)
        }

        return values;
    }

    /**
     * Create register
     *
     * @param {*} { request }
     * @returns
     * @memberof Controller
     */
    async store({ request }){

        const data = await request.only(this.model.schema.attributes)

        const verifyExist = await this.verifyUniqueExist({ request })
        if(verifyExist.existSome)
            return verifyExist;
        else {
            const values = await this.model.create(data);
            return values;
        }

    }

    /**
     * Update register by id
     *
     * @param {*} { request, params }
     * @returns
     * @memberof Controller
     */
    async update({ request, params }){
        let data = await request.only(this.model.schema.attributes)

        const currentData = await this.model.find(params.id);
        await currentData.merge(data)
        await currentData.save();

        return currentData;
    }

    /**
     * Delete register by id
     *
     * @param {*} { params }
     * @returns
     * @memberof Controller
     */
    async destroy({ params }){

        const values = await this.model.find(params.id);

        const deleted = await values.delete();

        return { deleted: deleted };

    }


    /**
     * Verify unique fields
     *
     * @param {*} { request }
     * @returns
     * @memberof Controller
     */
    async verifyUniqueExist({ request }){

      let verify = {
        verifications: [],
        existSome: false
      }

      if(!this.model.schema.unique){
        return verify
      }

      const data = await request.only(this.model.schema.attributes)

      let unique = await this.model.schema.unique.map(value => {
          if( Object.keys(data).includes(value) )
              return [value, data[value]]
      });

      if(unique[0])
          return verify;

      for(let i in unique){
          if (unique[i] == undefined) continue;

          const verification = await this.model.findBy(unique[i][0], unique[i][1])
          if(verification != null) verify.existSome = true;

          verify.verifications.push({ [unique[i][0]]: verification == null ? false: true } )
      }

      return verify;
  }

}

module.exports = Controller;
