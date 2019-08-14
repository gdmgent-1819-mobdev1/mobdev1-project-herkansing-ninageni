class Profile {
    constructor(id, first, last, adress, email, phone) {
      this.id = id;
      this.firstName = first;
      this.lastName = last;
      this.address = adress;
      this.email = email;
      this.phoneNumber = phone;
    }
  }
  
  class Student extends Profile {
    constructor(id, first, last, adress, email, phone, type, school) {
      super(id, first, last, adress, email, phone);
      this.type = type;
      this.school = school;
    }
  }
  
  class Kotbaas extends Profile {
    constructor(id, first, last, adress, email, phone, type) {
      super(id, first, last, adress, email, phone);
      this.type = type;
    }
  }

  class Kot {
    constructor(id, address, coords, price, roomInfo, ownerId) {
      this.id = id;
      this.address = address;
      this.coords = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
      this.price = {
        rent: price.rent,
        deposit: price.deposit,
      };
      this.roominfo = {
        type: roomInfo.type,
        surface: roomInfo.surface,
        level: roomInfo.level,
        persons: roomInfo.persons,
        toilet: roomInfo.toilet,
        shower: roomInfo.shower,
        bath: roomInfo.bath,
        kitchen: roomInfo.kitchen,
        furniture: roomInfo.furniture,
        extra: roomInfo.extra,
      };
      this.ownerId = ownerId;
    }
  }
  
  export {
    Student, Kotbaas, Kot,
  };

  