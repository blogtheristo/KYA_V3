# KYA v3 — Know Your Agent v3

Risto Anton  
Lifetime Oy  
6 lokakuuta 2026  
onelifetime.world/blog

Agentti saa tehdä asioita. Kuka tarkistaa mitä se saa tehdä?

Agentit siirtyvät järjestelmiin, joissa toiminnoilla on seurauksia. Ne lukevat tuotantotietoja, valmistavat päätöksiä ja tietyissä ympäristöissä myös toimivat itse. Tämän takia esiin tulee helposti kysymys, joka haasteellista vastata: mitä tämä agentti saa tehdä, ja kuka tarkistaa sen?

Tarkistuksen tulee olla mahdollista ilman luottamusta siihen, ken rakentaa agentin. Siksi KYA v3 on julkinen.

---

## Mitä on avointa

KYA v3 on spesifikaatio. Se määrittelee agentin oikeudet: mitä agentti saa tehdä, mihin resursseihin, millä rajoituksilla ja millä ihospäätöksellä perusteltuna. Spesifikaatio on avoin (Apache-2.0), jotta kukaan voi tarkistaa sen.

Julkisessa repossa on jo osa siitä mitä agentti saa tehdä:
- Agent permission definitions (`agent-rights/`)
- Access control framework specification
- Rights verification protocols (KYA-defined specification for checking an agent's rights, not the implementation)

---

## Mitä on omistusoikeutta (Lifetime Oy)

Toteutus (kuinka oikeudet täytetään), kyvykkyysrajat (missä oikeuksia saa käyttää) ja todisteketju (mitä jää päätöksestä) ovat Lifetime Oy:n omaa:
- **Themis:** Oikeudellinen päättelymoottori (kuinka oikeudet täytetään)
- **Capacity Class:** Missä oikeuksia saa käyttää (esivalvontarajoitukset: resurssirajat, kyvykkyyskynnys, operaatiot)
- **Aegis:** Täysi suvereniteettitaso (toteutus + yhdenmukaisuustodisteet)

Nämä kuuluvat toteutukseen, jonka saat Lifetime Oy:n sopimuksen myötä. Lähdekoodia ei jaeta, mutta saat käyttöoikeuden toteutukseen oman toimintasi sisällä.

---

## Miksi avoin spesifikaatio

Agentin oikeuksien tulee olla tarkistettavissa riippumatta siitä, ken rakentaa agentin. Tämä takaa yhteys mahdollisuuden ja luottamuksen. Jos sinulla on huoltoi siitä, mitä agentti saa tehdä, voit tarkistaa spesifikaation ilman Lifetime Oy’n osallistumista. Jos sinulla on huolto siitä, kuinka oikeuksia täytetään tai kuinka todisteet säilytetään, sovitteet Lifetime Oy:n kanssa.

Spesifikaation ollessa avoin ei tarkoita, että toteutus on avoin. Se tarkoittaa, että säännöt näkyvät niitä varten. Toteutus ja todisteet pysyvät omistusoikeudella, koska ne sisältävät Lifetime Oy:n teknologiaa ja vastuun tuloksista.

---

**Spesifikaatio:** https://github.com/blogtheristo/KYA_V3  
**Toteutus:** Tuodaan sopimuksesi mukana Lifetime Oy:n toimesta

---

KYA v3 on avoin, jotta kuka tahansa voi tarkistaa mitä agentti saa tehdä. Auki ei ole se, miten ne oikeudet toteutetaan, miten ne todistetaan ja kuka kantaa vastuun. Spesifikaatio on julkinen, toteutus ja todisteet eivät.