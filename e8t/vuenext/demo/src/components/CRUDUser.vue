<template>
  <section>
    <div class="form-container">
      <h2>Add User</h2>
      <form>
        <div>
          <label>Name</label>
          <br />
          <input type="text" />
        </div>
        <div>
          <button type="submit" class="submit">Add User</button>
        </div>
      </form>
    </div>
    <div class="list-container">
      <ul>
        <li>
          Wisdom Picker
          <span style="float:right;padding-right:10px;">
            <button>X</button>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
input {
  width: 20%;
  height: 30px;
  border: 2px solid green;
}
.sumbit {
  margin: 10px;
  padding: 10px;
  border-radius: 0px;
  border: 0px;
  background: green;
  color: white;
}
ul li {
  list-style: none;
  border: 2px solid green;
  width: 30%;
  margin-top: 10px;
}
</style>
