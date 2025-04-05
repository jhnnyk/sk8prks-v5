<template>
  <section class="section">
    <h1 class="title">Add a skatepark</h1>

    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g Roxborough" />
      </div>
    </div>

    <div class="field">
      <label class="label">slug</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g roxborough" />
      </div>
    </div>

    <div class="field">
      <label class="label">Street</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g. 123 Main St." />
      </div>
    </div>

    <div class="field">
      <label class="label">City</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g. Littleton" />
      </div>
    </div>

    <div class="field">
      <label class="label">State</label>
      <div class="control">
        <div class="select">
          <select>
            <option>CA - California</option>
            <option>CO - Colorado</option>
            <option>TX - Texas</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Zip Code</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g. 12345" />
      </div>
    </div>

    <div class="field">
      <label class="label">Latitude</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g. 39.8967" />
      </div>
    </div>

    <div class="field">
      <label class="label">Longitude</label>
      <div class="control">
        <input class="input" type="text" placeholder="e.g. -104.9358" />
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea class="textarea" placeholder="e.g. This skatepark is great!"></textarea>
      </div>
    </div>

    <label class="label">Tags:</label>
    <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" placeholder="e.g. lights" />
      </div>
      <div class="control">
        <button class="button is-link">Add tag</button>
      </div>
    </div>

    <label class="label">Images:</label>
    <div class="field">
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Path: e.g. /images/colorado/slocum/img_2345.jpg"
        />
      </div>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Alt Text: e.g. Slocum Skatepark street area"
        />
      </div>
      <div class="control">
        <button class="button is-link">Add image reference</button>
      </div>
    </div>

    <div class="field has-text-centered">
      <div class="control"><button class="button is-primary is-large">Save Skatepark</button></div>
    </div>
  </section>
</template>
