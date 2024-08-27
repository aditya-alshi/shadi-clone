import prisma from "./db";
import { z } from "zod"; 

const formSchema = z.object({
    gender : z.string(),
    age : z.string(),
    religion : z.string(),
    mother_tongue : z.string(),
})

async function person(formData: FormData) {
  'use server'
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  try {
    const parsedForm = formSchema.parse(data);
    console.log("Validation passed: ", parsedForm);
    const search = await prisma.search.create({
      data : {
        gender: parsedForm.gender,
        age: parseInt(parsedForm.age),
        religion: parsedForm.religion,
        motherTongue: parsedForm.mother_tongue
      }
    })
    console.log("Form submitted with search value :", search)
  } catch(error) {
    if(error instanceof z.ZodError) {
      for(const issue of error.issues) {
        console.error("Validation error", issue.message)
      }
    } else {
      console.log("Unexpectede error: ", error);
    }
  }
}

export default async function Home() {
  const getAll = await prisma.search.findMany()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <form className="flex justify-around w-4/5 p-2 shadow-sm" action={person}>
      <p>
    Age: <br />
    <select name="age" id="age">
      <option value="">--select--</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="39">39</option>
      <option value="40">40</option>
      <option value="41">41</option>
      <option value="42">42</option>
      <option value="43">43</option>
      <option value="44">44</option>
      <option value="45">45</option>
      <option value="46">46</option>
      <option value="47">47</option>
      <option value="48">48</option>
      <option value="49">49</option>
      <option value="50">50</option>
      <option value="51">51</option>
      <option value="52">52</option>
      <option value="53">53</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="56">56</option>
    </select>
  </p>

  <p>
    Gender: <br />
    <select name="gender" id="gender">
      <option value="">--select--</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </p>

  <p>
    Religion: <br />
    <select name="religion" id="religion">
      <option value="">--select--</option>
      <option value="Christianity">Christianity</option>
      <option value="Islam">Islam</option>
      <option value="Hinduism">Hinduism</option>
      <option value="Buddhism">Buddhism</option>
      <option value="Sikhism">Sikhism</option>
      <option value="Judaism">Judaism</option>
      <option value="Bahá'í">Bahá&apos;í</option>
    </select>
  </p>

  <p>
    Mother Tongue: <br />
    <select name="mother_tongue" id="mother_tongue">
      <option value="">--select--</option>
      <option value="Hindi">Hindi</option>
      <option value="Bengali">Bengali</option>
      <option value="Telugu">Telugu</option>
      <option value="Marathi">Marathi</option>
      <option value="Tamil">Tamil</option>
      <option value="Urdu">Urdu</option>
      <option value="Gujarati">Gujarati</option>
      <option value="Kannada">Kannada</option>
      <option value="Odia">Odia</option>
      <option value="Malayalam">Malayalam</option>
    </select>
  </p>
  <button type="submit">Submit</button>
     </form>
    </main>
  );
}
